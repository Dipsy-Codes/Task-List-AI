import OpenAI from "openai";
import React, { useEffect, useState } from "react";
import AiResponseToList from "./AiResponseToList";

interface Props {
  text: string;
}

const TaskList: React.FC<Props> = ({ text }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseText, setResponseText] = useState<string>("");
  const [responseTitle, setResponseTitle] = useState<string>("");

  useEffect(() => {
    const fetchOpenAI = async () => {
      const TaskListPrompt = `Take this problem and break it down into smaller bite sized problems to create a tasklist but don't make it too specific just general subtasks. sumarize the problem that was given as well. Give me the result as if it were a html unordered list. Here is the problem description: ${text}`;
      const TaskListTitlePrompt = `Take this problem and summarize it in as few words as possible: ${text}`;
      setIsLoading(true);

      try {
        const openai = new OpenAI({
          apiKey: "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",
          dangerouslyAllowBrowser: true,
        });

        const TaskListResponse = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: TaskListPrompt,
            },
          ],
          temperature: 0.5,
          max_tokens: 1024,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });

        const TaskListTitleResponse = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: TaskListTitlePrompt,
            },
          ],
          temperature: 0.5,
          max_tokens: 1024,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });

        var openAITitle = "";
        if (
          TaskListTitleResponse.choices[0].message.content?.toString() != null
        ) {
          openAITitle =
            TaskListTitleResponse.choices[0].message.content?.toString();
        }
        // Splitting the response by line and logging each line.
        var openAIText = "";

        if (TaskListResponse.choices[0].message.content?.toString() != null) {
          const match = TaskListResponse.choices[0].message.content
            ?.toString()
            .match(/<h1>(.*?)<\/h1>/);
          openAITitle = match ? match[1] : "";
          openAIText = TaskListResponse.choices[0].message.content?.toString();
        }
        console.log("start");
        console.log(openAITitle);
        console.log(openAIText);
        console.log("end");

        setResponseTitle(openAITitle);
        setResponseText(openAIText);
      } catch (error) {
        console.error("Error fetching from OpenAI:", error);
      }

      setIsLoading(false);
    };

    fetchOpenAI();
  }, [text]);

  return (
    <div className="container mt-4">
      <p>
        <AiResponseToList
          title={responseTitle}
          text={responseText}
          isLoading={isLoading}
        />
      </p>
    </div>
  );
};

export default TaskList;
