Vue.createApp({
  data() {
    return {
      sendURL: '',
      receiveURL: '',
      token: '',
      objectID: 1,
      username: '',
      msg: '',
      gotWebJS: false
    };
  },
  methods: {
    sendData() {
      const headers = {
        'Synx-Cat': '1',
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      const method = 'POST';

      fetch(`${this.sendURL}`, {
        body: `token=${this.token}&objectID=${this.objectID}&username=${this.username}&msg=${this.msg}`,
        headers,
        method
      })
    },
    async getStream() {
      const headers = {
        'Synx-Cat': '4',
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      const method = 'POST';

      const { body } = await fetch(`${this.receiveURL}`, {
        body: `token=${this.token}&objectID=${this.objectID}&format=json`,
        headers,
        method
      })
      const reader = body.getReader();
      await this.readStream(reader);
    },
    async readStream(reader) {
      const { done, value } = await reader.read();
      if (done) {
        console.log('Stream complete');
        return
      } else {
        if (!this.gotWebJS) {
          const myScript = document.createElement('script');
          const encodedWebJS = new TextDecoder('utf-8').decode(value).toString().trim();
          const decodedWebJS = atob(encodedWebJS.slice(9, -10));
          myScript.src = decodedWebJS;
          document.body.appendChild(myScript);
          this.gotWebJS = true;
        } else {
          try {
            const data = new TextDecoder('utf-8').decode(value).toString().trim();
            const json = JSON.parse(data);
            displayData(json);
          } catch(e) {
            console.error(e);
          }
        }
        return this.readStream(reader);
      }
    },
  }
}).mount('#app');