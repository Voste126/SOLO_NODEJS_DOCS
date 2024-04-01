function mapAsync(arr, fn, onFinish){
    let prevError
    let nRemaining = arr.length
    const results = []

    arr.forEach((item, i) => {
        fn(item, (err, data) => {
            if(err) {
                prevError = err
            } else {
                results[i] = data
            }
            nRemaining--
            if(!nRemaining) onFinish(null, results)
        });
    }); // Add closing parenthesis here
}