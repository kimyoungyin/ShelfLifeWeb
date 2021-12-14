const useGapText = (gap) => {
    let hours = Math.floor(gap / (1000 * 60 * 60));
    let minutes = Math.floor((gap / (1000 * 60)) % 60);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours} 시간 ${minutes} 분`;
};

export default useGapText;
