const Modal = {
    open(){
        //Abrir o modal
        //Adicionar a class active ao modal
         document.querySelector('.main-overlay')
         .classList
         .add('active')
    },
    close(){
        // Fechar o modal
        // Remover a class active do modal
        document.querySelector('.main-overlay')
         .classList
         .remove('active')
    }
}

//Lembrando que um array é uma coleção/lista de arquivos

const Storage ={
    get(){
        return JSON.parse(localStorage.getItem("Tio.finança$$:transaction")) 
        || [] //Lembrando que || significa 'ou'.
    },
    set(Transaction){
        localStorage.setItem("Tio.finança$$:Transaction", JSON.stringify
        (Transaction))
    }
}

const transaction = {
    all: Storage.get(), //Ele pegou essa informação e guardou no LocalStorage.


    add(Transaction){

        transaction.all.push(Transaction)

        App.reload()

    },

    remove(index){
        transaction.all.splice(index, 1)

        App.reload()
    },

    incomes(){
        let income =0;
        //Pegar todas as transações,
        //Para cada transação
        transaction.all.forEach(Transaction => {
            //Se ela for maior que 0
            if(Transaction.amount > 0){
                //Somar a uma variável e retornar a variável
                income += Transaction.amount;

                
            }
        })
        return income;
    },
    expenses(){
        let expense =0;
        //Pegar todas as transações,
        //Para cada transação
        transaction.all.forEach(Transaction => {
            //Se ela for menor que 0
            if(Transaction.amount < 0){
                //Somar a uma variável e retornar a variável
                expense += Transaction.amount;
            }
        })
        return expense
    },
    total(){
        
        return transaction.incomes() + transaction.expenses();
        
    }
}

const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),

    addTransaction(Transaction, index){
        const tr = document.createElement('tr')//Assim ,eu já apago o tr na const html
        tr.innerHTML = DOM.innerHTMLTransaction(Transaction, index) /*Ele está pegando 
         o return html, jogando para o DOM.innerHTMLTransaction e 
         passando pro tr.innerHTML. Ou seja, ele está pegando o que 
         está escrito na const html.*/
         tr.dataset.index = index
         DOM.transactionContainer.appendChild(tr)
        
    },
    innerHTMLTransaction(Transaction, index){
        const CSSclass = Transaction.amount > 0 ? "income" : "expense"
           
        const amount = Utils.formatCurrency(Transaction.amount)

        const html = `
       
        <td class="description">${Transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${Transaction.date} </td>
        <td>
        <img onclick="transaction.remove(${index})"src=
        "assets/minus.svg" alt="Remover Transação">
                </td>
                
        `

        return html
    },
    updateBalance(){
        document.getElementById('incomesDisplay')
        .innerHTML = Utils.formatCurrency(transaction.incomes())
        document.getElementById('expensesDisplay')
        .innerHTML = Utils.formatCurrency(transaction.expenses())
        document.getElementById('totalDisplay')
        .innerHTML = Utils.formatCurrency(transaction.total())
    },
    clearTransactions(){
        DOM.transactionContainer.innerHTML = ""
    }
}

const Utils = {
    
    formatAmount(value){ //Vai retornar o valor formatado, em forma de string.
        value = Number(value) * 100

        return value
    }, 
    formatDate(date){
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`

    },
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : "" 

        value = String(value).replace(/\D/g, "")            

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value

    }
}

const Form ={
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues(){
        return{
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },
 
    validateFields(){
        const {description, amount, date} = Form.getValues()
    if(description.trim() === "" || amount.trim() === "" || date.trim() === ""){
        //Trim fará uma limpeza dos espaços vazios.
        throw new Error("Preencha todos os campos vazios.")

    }         
    },
    formatValues(){
        let {description, amount, date} = Form.getValues()/*Tem que ser let, porque
        a conts não permite mudanças, diferente do let que permite. */
        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)
        return {
            description,
        amount,
        date
    }

},
    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event){
    event.preventDefault()  


    try {
        Form.validateFields()
    //Formatar os dados para salvar
    const Transaction = Form.formatValues()
    transaction.add(Transaction)//Adicionar transação
    Form.clearFields() //Limpar os fields
    Modal.close() 


    } catch (error) {
     alert(error.message)   
    }
     
    }
}

const App = {
    init() {

        transaction.all.forEach(DOM.addTransaction)
            /*Basicamente aqui ele irá mostrar
             todas as transações do momento. */
             /*Como está ocorrendo de maneira exemplificada: 
             
             transaction.all.forEach(function(Transaction, index)) {
                 DOM.addTransaction(Transaction, index)
             })
             */               
        
        DOM.updateBalance()

        Storage.set(transaction.all)

        
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    },
}
App.init()





//Comando para copiar e colar na linha de baixo: CTRL + Shift + seta para baixo.
//Depois pesquisar sobre a function toggle.
//Mudar entre abas: ctrl + TAB 
//Mudar de tela entre programas abertos: Alt + TAB e segurar o Alt para escolher.
           
// CARAMBAAAAAAAAAA!!!!!! FINALMENTE CONCLUI MANO, GRAÇAS A DEUS!!! 
// DEUS É BOM O TEMPO TODO!!!!!