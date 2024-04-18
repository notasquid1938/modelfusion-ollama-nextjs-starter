const { ModelFusionTextStream, asChatMessages } = require("@modelfusion/vercel-ai");
const { Message, StreamingTextResponse } = require("ai");
const { ollama, streamText } = require("modelfusion");

exports.runtime = "edge";

exports.POST = async function(req) {
  const { messages } = await req.json();

  // Use ModelFusion to call Ollama:
  const textStream = await streamText({
    model: ollama.ChatTextGenerator({ 
      model: "rizzler:latest",
      stopSequences: ['<|im_end|>']
     })
      .withChatPrompt(),
    prompt: {
      // system:
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
