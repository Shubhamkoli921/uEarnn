export default function copyContentsFromElement(element, onSuccess, onFail) {
  navigator.clipboard.writeText(element.innerText).then(
    () => {
      onSuccess && onSuccess();
    },
    () => {
      onFail && onFail();
    }
  );
}
