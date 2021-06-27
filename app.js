Vue.createApp({
  data() {
    return {
      url: '',
      token: '',
      objectID: 0,
      gotWebJS: false
    };
  },
  methods: {
    async getStream() {
      const headers = {
        'Synx-Cat': '4',
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      const method = 'POST';

      const { body } = await fetch(`${this.url}`, {
        body: `token=${this.token}&objectID=${this.objectID}&format=json`,
        headers,
        method
      })

      const reader = body.getReader();
      this.readStream(reader);
    },
    async readStream(reader) {
      const { done, value } = await reader.read();
      if (done) {
        console.log('Stream complete');
        return
      } else {
        if (!this.gotWebJS) {
          const myScript = document.createElement('script');
          const webJS = new TextDecoder('utf-8').decode(value).toString().trim();
          const decodedWebJS = atob(webJS.slice(9, -10));
          myScript.textContent = decodedWebJS;
          document.body.appendChild(myScript);
          this.gotWebJS = true;
        } else {
          const data = new TextDecoder('utf-8').decode(value).toString().trim();
          const json = JSON.parse(data);
          displayData(json);
        }
        return this.readStream(reader);
      }
    }
  }
}).mount('#app');

// myScript.textContent = `
//           const table = document.createElement("table");
//           table.style.border = "1px solid black";
//           table.style.width = "500px";
//           table.style.borderCollapse = "collapse";
//           table.style.margin = "16px 0";
//           const tableRow1 = document.createElement("tr");
//           const tableHeader1 = document.createElement("th");
//           const tableHeader2 = document.createElement("th");
//           tableHeader1.innerHTML = "Data Element";
//           tableHeader2.innerHTML = "Value";
//           tableRow1.appendChild(tableHeader1);
//           tableRow1.appendChild(tableHeader2);
//           table.appendChild(tableRow1);
          
//           let tableCreated = false;
//           let tableRow2;
//           let tableCell1;
//           let tableCell2;
//           const displayData = ({ RTW }) => {
//             if (!tableCreated) {
//               tableRow2 = document.createElement("tr");
//               tableCell1 = document.createElement("td");
//               tableCell2 = document.createElement("td");
//               tableRow2.appendChild(tableCell1);
//               tableRow2.appendChild(tableCell2);
//               tableCreated = true;
//             }
//             for (const [key, value] of Object.entries(RTW)) {
//               tableCell1.innerHTML = key;
//               tableCell2.innerHTML = value;
//             }
//             table.appendChild(tableRow2);
//             const tableRows = document.querySelectorAll("tr");
//             const tableCells = document.querySelectorAll("td");
//             tableRows.forEach(row => {
//               row.style.borderBottom = "1px solid black";
//             })
//             tableCells.forEach(cell => {
//               cell.style.padding = "4px";
//             })
//           };
//           const appElement = document.getElementById("app");
//           appElement.appendChild(table);
//           const tableHeaders = document.querySelectorAll("th");
//           tableHeaders.forEach(header => {
//             header.style.padding = "4px";
//             header.style.textAlign = "left";
//           })`;
