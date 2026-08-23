import fs from "fs";
import { askAi } from "../services/openRouter.service.js";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import Interview from "../models/interview.model.js";

// this function analyzez the resume and lists the skills and projects of the user
export const analyzeResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Resume is required" });
  }

  const filePath = req.file.path;

  try {
    const fileBuffer = await fs.promises.readFile(filePath);
    const uint8Array = new Uint8Array(fileBuffer);

    const pdf = await pdfjsLib.getDocument({
      data: uint8Array,
      useSystemFonts: true,
    }).promise;

    let resumeText = "";
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      const pageText = textContent.items.map((item) => item.str).join(" ");
      resumeText += pageText + "\n";
    }

    resumeText = resumeText.replace(/\s+/g, " ").trim();

    const messages = [
      {
        role: "system",
        content: `Extract structured data from resume. Return strictly raw JSON with no markdown wrapping or extra text:
{
  "role": "string",
  "experience": "string",
  "projects": ["project1", "project2"],
  "skills": ["skill1", "skill2"]
}`,
      },
      {
        role: "user",
        content: resumeText,
      },
    ];

    const aiResponse = await askAi(messages);

    const cleanJsonResponse = aiResponse.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanJsonResponse);

    return res.json({
      role: parsed.role,
      experience: parsed.experience,
      projects: parsed.projects,
      skills: parsed.skills,
      resumeText,
    });
  } catch (error) {
    console.error("Resume Analysis Error:", error);
    return res.status(500).json({ message: error.message });
  } finally {
    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (unlinkErr) {
        console.error("Failed to delete temp file:", unlinkErr);
      }
    }
  }
};

// generate question function
export const generateQuestion = async (req, res) => {
  try {
    const { role, experience, mode, resumeText, projects, skills } = req.body;

    role = role?.trim();
    experience = experience?.trim();
    mode = mode?.trim();

    if (!role || !experience || !mode) {
      return res
        .status(400)
        .json({ message: "Role, Experience and Mode are required" });
    }

    const user = await User.findById(req.userId);

    if (user.credit < 50) {
      return res.status(400).json({
        message: "Not enough credits. Minimum 50 required",
      });
    }

    const projectText =
      Arrays.isArray(projects) && projects.length
        ? projects.join(", ")
        : "None";

    const skillsText =
      Array.isArray(skills) && skills.length ? skills.join(", ") : "None";

    const safeResume = resumeText?.trim() || "None";

    const userPrompt = `
    Role: ${role}
    Experience: ${experience}
    InterviewMode: ${mode}
    Projects: ${projectText}
    skills: ${skillsText},
    Resume: ${safeResume}
    `;

    if (!userPrompt.trim()) {
      return res.status(400).json({
        message: "Prompt content is empty.",
      });
    }

    const messages = [
      {
        role: "system",
        content: `
You are a real human interviewer conducting a professional interview.

Speak in simple, natural English as if you are directly talking to the candidate.

Generate exactly 5 interview questions.

Strict Rules:
- Each question must contain between 15 and 25 words.
- Each question must be a single complete sentence.
- Do NOT number them.
- Do NOT add explanations.
- Do NOT add extra text before or after.
- One question per line only.
- Keep language simple and conversational.
- Questions must feel practical and realistic.

Difficulty progression:
Question 1 → easy  
Question 2 → easy  
Question 3 → medium  
Question 4 → medium  
Question 5 → hard  

Make questions based on the candidate’s role, experience,interviewMode, projects, skills, and resume details.
`,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ];

    const aiResponse = await askAi(messages);

    if (!aiResponse) {
      return res.status(500).json({
        message: "Failed to generate questions",
      });
    }

    const cleanResponse = aiResponse.replace(/```json|```/g, "").trim();
    const questionsArray = cleanResponse
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    if (questionsArray.length === 0) {
      return res
        .status(500)
        .json({ message: "Ai failed to generate questions" });
    }

    const finalQuestions = questionsArray.slice(0, 5);
    user.credits -= 50;
    await user.save();

    const interview = await Interview.create({
      userId: req.userId,
      role,
      experience,
      mode,
      questions: finalQuestions.map((q, index) => ({
        question: q,
        difficulty: ["easy", "easy", "medium", "medium", "hard"][index],
        timeLimit: [60, 60, 90, 90, 120][index],
      })),
    });

    return res.status(201).json({
      success: true,
      interviewId: interview._id,
      creditsLeft: user.credits,
      userName: user.name,
      questions: interview.questions,
    });
  } catch (error) {
    console.error("Generate Question Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// submit answer function
export const submitAnswer = async (req, res) => {
  try {
    const { interviewId, questionIndex, answer, timeTaken } = req.body;

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    const question = interview.questions[questionIndex];

    if (!answer) {
      question.score = 0;
      question.feedback = "You did not submit an answer.";
      question.answer = "";

      await interview.save();

      return res.json({
        feedback: question.feedback,
      });
    }

    if (timeTaken > question.timeLimit) {
      question.score = 0;
      question.feedback = "Time limit exceeded. Answer not evaluated.";
      question.answer = answer;

      await interview.save();

      return res.json({
        feedback: question.feedback,
      });
    }

    const messages = [
      {
        role: "system",
        content: `
You are a professional human interviewer evaluating a candidate's answer in a real interview.

Evaluate naturally and fairly, like a real person would.

Score the answer in these areas (0 to 10):

1. Confidence – Does the answer sound clear, confident, and well-presented?
2. Communication – Is the language simple, clear, and easy to understand?
3. Correctness – Is the answer accurate, relevant, and complete?

Rules:
- Be realistic and unbiased.
- Do not give random high scores.
- If the answer is weak, score low.
- If the answer is strong and detailed, score high.
- Consider clarity, structure, and relevance.

Calculate:
finalScore = average of confidence, communication, and correctness (rounded to nearest whole number).

Feedback Rules:
- Write natural human feedback.
- 10 to 15 words only.
- Sound like real interview feedback.
- Can suggest improvement if needed.
- Do NOT repeat the question.
- Do NOT explain scoring.
- Keep tone professional and honest.

Return ONLY valid JSON in this format:

{
  "confidence": number,
  "communication": number,
  "correctness": number,
  "finalScore": number,
  "feedback": "short human feedback"
}
`,
      },
      {
        role: "user",
        content: `
Question: ${question.question}
Answer: ${answer}
`,
      },
    ];

    const aiResponse = await askAi(messages);

    if (!aiResponse) {
      return res.status(400).json({ message: "AI failed to respond" });
    }

    const cleanResponse = aiResponse.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanResponse);

    question.score = parsed.finalScore;
    question.feedback = parsed.feedback;
    question.confidence = parsed.confidence;
    question.communication = parsed.communication;
    question.correctness = parsed.correctness;
    question.answer = answer;

    await interview.save();

    return res.json({
      feedback: parsed.feedback,
    });
  } catch (error) {
    console.error("Submit Answer Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// final report controller
export const finishInterview = async (req, res) => {
  try {
    const { interviewId } = req.body;
    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(400).json({ message: "Failed to find interview" });
    }

    let totalScore = 0;
    const totalQuestions = interview.questions.length;
    let totalConfidence = 0;
    let totalCommunication = 0;
    let totalCorrectness = 0;

    interview.questions.forEach((q) => {
      totalScore += q.score || 0;
      totalConfidence += q.confidence || 0;
      totalCommunication += q.communication || 0;
      totalCorrectness += q.correctness || 0;
    });

    interview.finalScore = totalScore / totalQuestions;
    interview.confidence = totalConfidence / totalQuestions;
    interview.communication = totalCommunication / totalQuestions;
    interview.correctness = totalCorrectness / totalQuestions;
    interview.status = "Completed";
    await interview.save();

    return res.status(200).json({
      message: "Interview Completed Successfully",
      data: {
        finalScore: Number(finalScore.toFixed(1)),
        confidence: Number(totalConfidence / totalQuestions.toFixed(1)) || 0,
        communication:
          Number(totalCommunication / totalQuestions.toFixed(1)) || 0,
        correctness: Number(totalCorrectness / totalQuestions.toFixed(1)) || 0,
        questionWiseScore: interview.questions.map((q) => ({
          question: q.question || 0,
          score: Number(q.score.toFixed(1)) || 0,
          confidence: Number(q.confidence.toFixed(1)) || 0,
          communication: Number(q.communication.toFixed(1)) || 0,
          correctness: Number(q.correctness.toFixed(1)) || 0,
          feedback: q.feedback || "",
        })),
      },
    });
  } catch (error) {
    console.error("Finish Interview Error:", error);
    return res.status(500).json({ message: error.message });
  }
};
