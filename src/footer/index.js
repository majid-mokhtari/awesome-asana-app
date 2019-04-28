export default function() {
  return new Promise((resolve, reject) => {
    fetch("snippets/footer.html")
      .then(response => {
        return response.text();
      })
      .then(body => {
        resolve(body);
      })
      .catch(err => reject(err));
  });
}
