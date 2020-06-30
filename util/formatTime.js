export default function formatTime(miliseconds) {
    const seconds = Math.floor((miliseconds % 60000) / 1000)
    const minutes = Math.floor(miliseconds / 60000)
    const hundreds = (miliseconds % 1000) / 10
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${hundreds < 10 ? '0' : ''}${hundreds}`
}