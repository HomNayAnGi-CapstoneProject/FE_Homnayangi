export default function scrollToTargetAdjusted(offset, id) {
    var element = document.getElementById(id);
    var headerOffset = offset;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}