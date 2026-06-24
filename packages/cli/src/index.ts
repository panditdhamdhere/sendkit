import { Command } from "commander";

const program = new Command();

program.name("sendkit")
.description("Sendkit Cli")
.command("telegram").description("Send a telegram mesaage").argument("<chatId>", "Telegram Chat ID").argument("<message>", "Message text to send")

.action(async (chatId: string, message: string) => {
    console.log("chatId", chatId)
     console.log("message",  message)
     process.exit(1)
})

program.parseAsync(process.argv)