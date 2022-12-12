import colors from 'colors'
try {
    let arr = []
    let [start,end] = process.argv.splice(2)
    start = parseInt(start)
    end = parseInt(end)
    
    if(isNaN(start) || isNaN(end)){
        throw new SyntaxError(colors.red('Аргумент не число!!'))
    }
   
    function isSimple (n) {
        if (n === 1 || n === 0) {
            throw new SyntaxError(colors.red('Не найдено простых чисел в диапазоне'))
        } else {
            for(let i = 2; i < n; i++) {
                if(n % i === 0) {
                    return false;
                }
            }
            return true;
        }
    }

    let not_simple = 0
    for (let i = start; i <= end; i++){
        if(isSimple(i)){
            arr.push(i)
            not_simple++
        }
    }
    if(!not_simple){
        throw new SyntaxError(colors.red('Не найдено простых чисел в диапазоне'))
    }
    
    function makeNestedArray(arr, pivot) {
        return arr.reduce((a, c, i) => {
        if (i % pivot === 0) {
            a.push([]);
        }
        return a[a.length - 1].push(c), a;
        }, []);
    }
    
    for(let i of makeNestedArray(arr,3)){
        for(const [k,j] of i.entries()){
            if (k == 0) {
                console.log(colors.red(j))
            } else if(k == 1) {
                console.log(colors.yellow(j))
            } else console.log(colors.green(j))
        }
    }  
} catch (e) {
    console.log(e.message)   
}

