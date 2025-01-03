const sexChart = document.getElementById("sex-chart");
const ageChart = document.getElementById("age-chart");
const timeChart = document.getElementById("time-chart");
const percentChart = document.getElementById("percent-chart");

const percentBox = document.querySelector(".percent");
const numberVotes = document.querySelector(".numberVotes");
const totalVotes = document.querySelector(".totalVotes");

const intNumberVotes = +numberVotes.textContent;
const intTotalVotes = +totalVotes.textContent;

const percentVote = (intNumberVotes, intTotalVotes) => {
  const percent = (intNumberVotes / intTotalVotes) * 100;
  percentBox.textContent = `${percent}% `;
};

percentVote(intNumberVotes, intTotalVotes);

const genderAPI = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:3000/api/v1/votes",
    });
    const votes = res.data.data.votes;
    let mNumber = 0;
    let fnumber = 0;
    for (let i = 0; i < votes.length; i++) {
      if (votes[i].sex === "Masculin") {
        mNumber++;
      }
      if (votes[i].sex === "Feminin") {
        fnumber++;
      }
    }
    new Chart(sexChart, {
      type: "bar",
      data: {
        labels: ["Masculin", "Feminin"],
        datasets: [
          {
            label: "Numar voturi",
            data: [mNumber, fnumber],
            borderWidth: 1,
            backgroundColor: [
              "rgb(30,144,255,0.5)", // Culoare pentru voturi exprimate
              "rgba(136,8,8, 0.5)", // Culoare pentru voturi neexprimate
            ],
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
            title: { display: true, text: "Gen" },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Distribuția votanților după sex",
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const ageAPI = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:3000/api/v1/votes",
    });
    const votes = res.data.data.votes;
    let votesOver18 = 0;
    let votesOver26 = 0;
    let votesOver36 = 0;
    let votesOver51 = 0;
    let votesOver66 = 0;
    for (let i = 0; i < votes.length; i++) {
      if (votes[i].varsta >= 18 && votes[i] < votes[i] <= 25) {
        votesOver18++;
      }
      if (votes[i].varsta >= 26 && votes[i] < votes[i] <= 35) {
        votesOver26++;
      }
      if (votes[i].varsta >= 36 && votes[i] < votes[i] <= 50) {
        votesOver36++;
      }
      if (votes[i].varsta >= 51 && votes[i] < votes[i] <= 65) {
        votesOver51++;
      }
      if (votes[i].varsta > 65) {
        votesOver66++;
      }
    }
    new Chart(ageChart, {
      type: "bar",
      data: {
        labels: ["18-25", "26-35", "36-50", "51-65", "65+"],
        datasets: [
          {
            label: "Numar voturi",
            data: [
              votesOver18,
              votesOver26,
              votesOver36,
              votesOver51,
              votesOver66,
            ],
            borderWidth: 1,
            backgroundColor: [
              "rgb(30,144,255,0.5)", // Culoare pentru voturi exprimate
              "rgba(136,8,8, 0.5)", // Culoare pentru voturi neexprimate
              "rgb(255, 206, 86)",
              "rgb(75, 192, 192)",
              "rgb(153, 102, 255)",
            ],
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
            title: { display: true, text: "Varsta" },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Distribuția votanților după varsta",
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const timeAPI = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:3000/api/v1/votes",
    });
    const votes = res.data.data.votes;
    // Prelucrarea datelor pentru a număra voturile pe ore
    const votesByHour = Array(24).fill(0);
    votes.forEach((item) => {
      const hour = new Date(item.votedAt).getHours();
      votesByHour[hour]++;
    });

    new Chart(timeChart, {
      type: "line",
      data: {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`), // Orele
        datasets: [
          {
            label: "Număr de voturi",
            data: votesByHour,
            borderColor: "blue",
            backgroundColor: "lightblue",
            fill: true,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Distribuția de voturi în funcție de timp",
          },
        },
        scales: {
          x: { title: { display: true, text: "Ora" } },
          y: { title: { display: true, text: "Număr de voturi" } },
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const percentAPI = () => {
  // Datele pentru prezența la vot
  let totalVoters = intTotalVotes; // Total persoane cu drept de vot
  let votesCast = intNumberVotes; // Numărul de voturi exprimate
  const votesNotCast = totalVoters - votesCast; // Numărul celor care nu au votat

  const presenceData = {
    labels: ["Voturi Exprimate", "Voturi Neexprimate"],
    datasets: [
      {
        data: [votesCast, votesNotCast], // Datele de afișat
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)", // Culoare pentru voturi exprimate
          "rgba(201, 203, 207, 0.5)", // Culoare pentru voturi neexprimate
        ],
        borderColor: ["rgba(75, 192, 192, 5)", "rgba(201, 203, 207, 5)"],
        borderWidth: 1,
        
      },
    ],
  };

  // Configurarea graficului
  const presenceChart = new Chart(percentChart, {
    type: "doughnut",
    data: presenceData,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Prezența la Vot - Participare Totală',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((context.raw / total) * 100).toFixed(2);
              return `${context.label}: ${percentage}%`;
            },
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
};

genderAPI();
ageAPI();
timeAPI();
percentAPI();
