import { convoScript } from "@convo-lang/convo-lang";

export const singleColumnEmailTemplate=convoScript`
> template

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{tmpl("header0")}}</title>
</head>
<body>
    <div style="padding:18px">
        {{tmpl("header1" "html")}}

        {{tmpl("p0" "html")}}

        <p>
            <a style="color:red" href="{{tmpl("linkUrl0" "html")}}">{{tmpl("linkText0" "html")}}</a>
        </p>

        <img style="width:100%" alt="{{tmpl("imageText0" "html")}}" src="{{tmpl("imageUrl0" "html")}}"/>
    </div>
</body>
</html>

`
