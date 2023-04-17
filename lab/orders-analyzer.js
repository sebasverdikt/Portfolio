fetch('https://sebasverdikt.com/lab/orders.json')
  .then(response => response.json())
  .then(orders => {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const count = {};
    const total = {};
    const avg = {};

    weekdays.forEach(weekday => {
      count[weekday] = 0;
      total[weekday] = 0;
      avg[weekday] = 0;
    });

    orders.orders.forEach(order => {
      const creationDate = new Date(order.creationDate);
      const weekday = weekdays[creationDate.getDay()];
      order.orderLines.forEach(orderLine => {
        count[weekday] += orderLine.quantity;
        total[weekday] += orderLine.unitPrice * orderLine.quantity;
      });
    });

    weekdays.forEach(weekday => {
      total[weekday] = (Math.round(total[weekday] * 100) / 100).toFixed(2);
      if (total[weekday] == 0) {
        total[weekday] = "0";
      }
      avg[weekday] = count[weekday] > 0 ? (Math.round((total[weekday] / count[weekday]) * 100) / 100).toFixed(2) : "0";
    });

    const list = document.createElement('ul');
    weekdays.forEach(weekday => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <h3>${weekday}:</h3>
        count: <strong>${count[weekday]}</strong>
        total: <strong>${total[weekday]}</strong>
        avg: <strong>${avg[weekday]}</strong>
      `;
      list.appendChild(listItem);
    });

    const ordersResults = document.getElementById('orders-analyzed')
    ordersResults.appendChild(list);
  })
  .catch(error => console.error(error));
