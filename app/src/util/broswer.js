export function getModule(file) {
    try {
        let reader = new FileReader();
        let text = reader.readAsText(file);
        console.log(text);
        let res = eval(text);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export function getContent(file) {
    return new Promise((r,j) => {
        try {
            let fr = new FileReader();
            fr.onload = function(e) {
                r(e.target.result);
            };
            fr.readAsText(file);
        } catch (err) {
            j(err);
        }
    });
}
