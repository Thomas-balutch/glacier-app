// ALTITUDE

new Chart(document.getElementById('altitudeChart'), {

  type: 'bar',

  data: {

    labels: ['Mer de Glace', 'Argentière', 'Bossons'],

    datasets: [{

      label: 'Altitude moyenne (m)',

      data: [2950, 3100, 2850],

      backgroundColor: '#3498db'

    }]

  }

});


// SURFACE

new Chart(document.getElementById('surfaceChart'), {

  type: 'bar',

  data: {

    labels: ['Mer de Glace', 'Argentière', 'Bossons'],

    datasets: [{

      label: 'Surface (km²)',

      data: [10.9, 12.4, 7.2],

      backgroundColor: '#2ecc71'

    }]

  }

});


// ÉVOLUTION

new Chart(document.getElementById('evolutionChart'), {

  type: 'line',

  data: {

    labels: ['1900', '1930', '1960', '1990', '2020'],

    datasets: [{

      label: 'Surface Mer de Glace (km²)',

      data: [45, 42, 38, 34, 32],

      borderColor: 'red',

      fill: true

    }]

  }

});

