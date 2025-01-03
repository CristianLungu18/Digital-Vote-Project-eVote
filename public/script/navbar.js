const logoutBtn = document.querySelector(".logout-btn");

const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:3000/api/v1/logout",
    });
    window.location.assign("/about");
  } catch (err) {
    console.log(err);
  }
};

if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    logout();
  });
}
