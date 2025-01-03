const votesChart = document.getElementById("voturi-chart");
const statsBox = document.querySelector(".stats-box");
const list = document.querySelector(".list");

const votesAPI = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:3000/api/v1/chartVotes",
    });
    const candidateArray = res.data.data;
    const nameArray = [];
    const votesArray = [];
    const candidateArraySorted = candidateArray.sort(
      (a, b) => b.voturi - a.voturi
    );
    for (let i = 0; i < candidateArraySorted.length; i++) {
      list.innerHTML += ` <li><h5>${candidateArraySorted[i].candidat}: ${candidateArraySorted[i].voturi} voturi</h5></li>`;
    }

    for (let i = 0; i < candidateArray.length; i++) {
      nameArray.push(candidateArray[i].candidat);
      votesArray.push(candidateArray[i].voturi);
    }

    new Chart(votesChart, {
      type: "bar",
      data: {
        labels: nameArray,
        datasets: [
          {
            label: "Numar voturi",
            data: votesArray,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Număr de voturi" },
          },
          x: {
            beginAtZero: true,
            title: { display: true, text: "Candidati" },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Distribuția totala de voturi",
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};

votesAPI();
