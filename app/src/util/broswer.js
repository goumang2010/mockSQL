export async function getModule(file) {
    try {
        let text = await getContent(file);
        let res = eval(text);
        return res;
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function getContent(file) {
    return new Promise((resolve, reject) => {
        try {
            let fr = new FileReader();
            fr.onload = function(e) {
                resolve(e.target.result);
            };
            fr.readAsText(file);
        } catch (err) {
            reject(err);
        }
    });
}
