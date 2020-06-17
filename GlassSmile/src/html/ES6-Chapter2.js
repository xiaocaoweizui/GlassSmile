

        let text="吉";
        console.log(text.length);
        console.log(/^.$/.test(text));//匹配任意单字符，false
        console.log(text.charAt(0));//""
        console.log(text.charAt(1));//""
        console.log(text.charCodeAt(0));
        console.log(text.charCodeAt(0));


        let re = /ab/g;
        console.log(re.source);//ab
        console.log(re.flags);//g

        var msg = 'Hello \
World!';

        var msg2 = 'Hello \n\
World!';
        console.log(msg);//Hello World!
        console.log(msg2);
        /*Hello 
        World!*/

        //反撇号
        let message = `Hello 
World!`;
        console.log(message);

        //占位符
        let name = "John", messageName = `Hello,${name}.`;
        console.log(messageName);//Hello,John.
        name = "Tomas";
        console.log(messageName);//Hello,John.


        //标签模板
        let count = 10, price = 2.5, total = passthru`${count} items cost ￥${(count * price).toFixed(2)}.`;
        //literals:[""," items cost ￥","."]
        //substitutions:[10,25.00]
        function passthru(literals, ...substitutions) {
            let result = "";
            for (let i = 0; i < substitutions.length; i++) {
                //使用原生的字符串：literals.raw[i]
                result += literals[i] + substitutions[i];
            }
            result += literals[literals.length - 1];
            return result;
        }
        console.log(total);//10 items cost ￥25.00.

        //访问转义前的模板字面量
        let msg3=`Multiline\nstring`;
        let msg4=String.raw`Multiline\nstring`;
        console.log(msg3);/*Multiline
string*/
        console.log(msg4);//Multiline\nstring
