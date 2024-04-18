const { ModelFusionTextStream, asChatMessages } = require("@modelfusion/vercel-ai");
const { Message, StreamingTextResponse } = require("ai");
const { ollama, streamText } = require("modelfusion");

exports.runtime = "edge";

exports.POST = async function(req) {
  const { messages } = await req.json();

  // Use ModelFusion to call Ollama:
  const textStream = await streamText({
    model: ollama.ChatTextGenerator({ model: "mistral:7b-instruct-q6_K" }).withChatPrompt(),
    prompt: {
      system:
        "You are an AI chat bot. " +
        "Follow the user's instructions carefully.",

      // map Vercel AI SDK Message to ModelFusion ChatMessage:
      messages: asChatMessages(messages),
    },
  });

  // Return the result using the Vercel AI SDK:
  return new StreamingTextResponse(
    ModelFusionTextStream(
      textStream,
      // optional callbacks:
      {
        onStart() {
          //console.log("onStart");
        },
        onToken(token) {
          //console.log("onToken", token);
        },
        onCompletion: () => {
          //console.log("onCompletion");
        },
        onFinal(completion) {
          //console.log("onFinal", completion);
        },
      }
    )
  );
}
