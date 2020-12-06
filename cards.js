/**
 * cards.js
 * 
 * Everything related to the card management will be done here. 
 * All the arrays, event listeners and functions shall be created here as long as 
 * they are realted to the the card management.
 * 
 * @author Practical IT
 * @author [Add your name here]
 */
let cards = {
  wallia: {
    title: 'Wallia',
    price:  25,
    minutes: 130,
    refillable: true
  },
  chellada: {
    title: 'Chellada',
    price:  20,
    minutes: 120,
    refillable: true
  },
  kebero: {
    title: 'Key Kebero',
    price:  10,
    minutes: 100,
    refillable: false
  }
};

let checkout = []; //array for checkedout cards.
let purchased = []; //array for the purchased cards
let email_subscribers = []; //array for the subscribers
let members = []; //array for the members

const buy_chellada_card = document.querySelector('#chellada');
const buy_wallia_card = document.querySelector('#wallia');
const buy_kebero_card = document.querySelector('#kebero');

const checkout_list = document.querySelector('#checkout_list');

const updateCheckout = () => {
  //create a list to be shown on the checkout list.
  let checkout_table = "";
  if (checkout.length > 0) {
    let grand_balanace = 0;
    let grand_total = 0;
    let item = 0;
    checkout.forEach( card => {
      let total = parseInt(cards[card.type].price)*parseInt(card.quantity);
      let balance = parseInt(cards[card.type].minutes)*parseInt(card.quantity);
      grand_balanace += balance
      item += card.quantity;
      checkout_table += `<tr>
      <td>${card.type}</td>
      <td>${card.quantity}</td>
      <td>${cards[card.type].price}</td>
      <td>${total}</td>
    </tr>`;
    });
    checkout_table += `<tr><td colspan="3">Grand Total</td><td><b>${grand_total}</b></td></tr>`
    checkout_list.innerHTML = checkout_table;
    document.querySelector('#balance').innerHTML = grand_balanace;
    document.querySelector('#item').innerHTML = item;
  }
}

const chellada_quantity = document.querySelector('#chellada_quantity');
const wallia_quantity = document.querySelector('#wallia_quantity')
const kebero_quantity = document.querySelector('#kebero_quantity')
//initially the buttons are disabled. They will be back to active when the user selects quantity.
const quantitySelected = (event) => {
  //get the type of the card from the id itself

  let card_type = event.target.id.split('_')[0];//gives the "type_quantity" as an id
  document.querySelector(`#${card_type}`).disabled = true;

  const quantity = event.target.value;
  if (quantity) { //meaning the user has seleted the quantity of the card to be purchased.

    //now the user has selected the quantity, activate the button.
    console.log(document.querySelector(`#${card_type}`));
    document.querySelector(`#${card_type}`).disabled = false;
  }
}
chellada_quantity.addEventListener('change', (event) => quantitySelected(event));
wallia_quantity.addEventListener('change', (event) => quantitySelected(event));
kebero_quantity.addEventListener('change', (event) => quantitySelected(event));

//purchased object example {type: 'chellada', quantity: 2 }

const addToCheckout = (type) => {
  
  //get valid card types
  let valid_types = Object.keys(cards);
  if (valid_types.includes(type)) {
    let found = false;
    for (let i=0; i<checkout.length; i++) {
      if (checkout[i].type == type) {
        checkout[i].quantity = checkout[i].quantity + 1;
        found = true;
      }
    }
    if (!found) {
      checkout.push({ type: type, quantity : 1});
    }
    updateCheckout();
  }
};
buy_chellada_card.addEventListener('click', () => addToCheckout('chellada'));
buy_wallia_card.addEventListener('click', () => addToCheckout('wallia'));
buy_kebero_card.addEventListener('click', () => addToCheckout('kebero'));


document.querySelector('#buy_button').addEventListener('click', () => {
  addToCheckout(document.querySelector('#buy_type').value);
});