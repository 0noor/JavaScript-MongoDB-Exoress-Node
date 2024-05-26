import { franc } from "franc";
import langs from "langs";
import colors from 'colors';
const input = process.argv.slice(2).toString();

let langCode = franc(input);
if (langCode === 'und') {
    console.log("Sorry couldnt figure it out, try with something else".red);
}
else {
    let language = langs.where("3", langCode)
    console.log(`Our best guess is: ${language.name}`.green);
}
