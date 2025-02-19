import DOMPurify from "dompurify";
import { marked } from "marked";
import TurndownService from "turndown";
const turndownService = new TurndownService();
turndownService.addRule("strikethrough", {
    filter: ["del", "s", "strike"],
    replacement: (content) => "~" + content + "~",
});
turndownService.addRule("heading", {
    filter: "h1",
    replacement: (content) => "# " + content,
});
class MarkdownConverter {
    async convertMarkdownToHtml(markdown) {
        return DOMPurify.sanitize(await marked(markdown));
    }
    convertHtmlToMarkdown(html) {
        console.log(html);
        return turndownService.turndown(html);
    }
}
export default new MarkdownConverter();
//# sourceMappingURL=MarkdownConverter.js.map