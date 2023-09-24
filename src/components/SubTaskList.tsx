import OpenAI from "openai";
import React, { useEffect, useState } from "react";
import AiResponseToList from "./AiResponseToList";

interface Props {
  text: string;
}

const SubTaskList: React.FC<Props> = ({ text }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseText, setResponseText] = useState<string>("");

  useEffect(() => {
    const fetchOpenAI = async () => {
      const appendedText = `Take this problem and break it down into 5 smaller bite sized problems to create a tasklist but don't make it too specific just general subtasks. after that format the task list so that it is in a html list only give me the actual list starting with the <ol> or <ul> tags. Here is the problem description: ${text}`;
      setIsLoading(true);

      try {
        const openai = new OpenAI({
          apiKey: "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",
          dangerouslyAllowBrowser: true,
        });

        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: appendedText,
            },
          ],
          temperature: 0.5,
          max_tokens: 1024,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });

        console.log(response.choices[0].message.content?.toString());

        // Splitting the response by line and logging each line.
        var openAIText = "";
        if (response.choices[0].message.content?.toString() != null) {
          openAIText = response.choices[0].message.content?.toString();
        }

        setResponseText(openAIText);
      } catch (error) {
        console.error("Error fetching from OpenAI:", error);
      }

      setIsLoading(false);
    };

    fetchOpenAI();
  }, [text]);

  return (
    <>
      <AiResponseToList title={""} text={responseText} isLoading={isLoading} />
    </>
  );
};

export default SubTaskList;
