const local = window.localStorage;
const title = document.getElementById('title');
const signInBtn = document.getElementById('sign-in-button');
const signInDiv = document.getElementById('sign-in-div');
const signInForm = document.getElementById('sign-in-form');
const logInBtn = document.getElementById('log-in-button');
const logInDiv = document.getElementById('log-in-div');
const logInForm = document.getElementById('log-in-form');
const logToSign = document.getElementById('log-in-to-signup');
const signToLog = document.getElementById('sign-up-to-log-in');
const signOrLog = document.getElementById('sign-or-log');
const dashboard = document.getElementById('dashboard');
const dashboardContent = document.getElementById('dashboard-content');
const listInside = document.getElementById('list-inside');
const listDiv = document.getElementById('list-div');
const newList = document.getElementById('new-list');
const listNameForm = document.getElementById('list-name-form');
const listLinks = document.getElementsByClassName('list-link');
const listTitle = document.getElementById('list-title');
const addListItem = document.getElementById('add-list-item');
const nameAlreadyUsed = document.getElementById('name-already-used');
const nameInUse = document.getElementById('name-in-use');
const save = document.getElementById('save');
const saveAndBack = document.getElementById('save-and-back');
const backToDashboard = document.getElementById('back-to-dashboard');
const logOut = document.getElementById('logout');
const changeUserInfo = document.getElementById('change-user-info');
const changeUserInfoLink = document.getElementById('change-user-info-link');
const changePass = document.getElementById('change-pass');
const fillInChange = document.getElementById('fill-in-change');
const passNotMatch = document.getElementById('pass-not-match');
const changeUserName = document.getElementById('change-user-name');
const confirmPassChange = document.getElementById('confirm-pass-change');
const submitUserChanges = document.getElementById('change-user-info-form');
const cancelUserChanges = document.getElementById('cancel-user-changes');

let editedItems = [];
let currentUser;
let currentList;
let users = [];
function User(name, pass) {
    this.userName = name;
    this.pass = pass;
    this.lists = [];
}

const findUser = (name) => {
    let user = false;
    for(prop of users) {
        if (prop.userName === name) {
            user = prop
        } 
    }
    return user;
}

const signIn = (e) => {
    const userName = document.getElementById('username');
    const userNameInUse = document.getElementById('username-already-used');
    const pass = document.getElementById('pass');
    const termsAgree = document.getElementById('terms-agree');
    const fillSpaces = document.getElementById('fill-spaces');
    const agreeToTerms = document.getElementById('agree-to-terms');
    e.preventDefault();
    userNameInUse.classList.add('unloaded');
    fillSpaces.classList.add('unloaded');
    agreeToTerms.classList.add('unloaded');
    if (!userName.value) {
        fillSpaces.classList.remove('unloaded')
    } else if (findUser(userName.value)) {
        userNameInUse.classList.remove('unloaded')
    } else if (termsAgree.checked === false) {
        agreeToTerms.classList.remove('unloaded')
    } else {
        let newUser = new User(userName.value, pass.value);
        users.push(newUser);
        local.setItem('users', JSON.stringify(users))
        local.setItem('currentUser', userName.value)
        currentUser = newUser;        
        const welcome = document.createElement('P');
        welcome.id = 'welcome';
        welcome.innerText = `Hello ${currentUser.userName}! Use the dashboard below to create and manage your to-do lists.`
        dashboard.insertBefore(welcome, dashboardContent);
        const lists = document.createElement('UL');
        lists.id = 'lists';
        dashboardContent.append(lists);
        signOrLog.classList.add('unloaded');
        signInDiv.classList.add('unloaded');
        title.classList.add('unloaded');
        dashboard.classList.remove('unloaded');   
        signInForm.reset();  
    }
    
}

const logIn = (e) => {
    const userName = document.getElementById('log-username');
    const pass = document.getElementById('log-pass');
    const fillLog = document.getElementById('fill-log');
    const userNotFound = document.getElementById('user-not-found');
    const wrongPass = document.getElementById('wrong-pass');
    e.preventDefault();
    fillLog.classList.add('unloaded');
    userNotFound.classList.add('unloaded');
    wrongPass.classList.add('unloaded');
    if (!userName.value) {
        fillLog.classList.remove('unloaded');
    } else if (findUser(userName.value) === false) {
        userNotFound.classList.remove('unloaded')
    } else if (findUser(userName.value).pass && findUser(userName.value).pass !== pass.value) {
        wrongPass.classList.remove('unloaded')
    } else {
        currentUser = findUser(userName.value);
        local.setItem('currentUser', userName.value)
        const welcome = document.createElement('P');
        welcome.id = 'welcome';
        welcome.innerText = `Hello again ${currentUser.userName}! Your to-do lists are available below.`;        
        dashboard.insertBefore(welcome, dashboardContent);
        displayLists();
        signOrLog.classList.add('unloaded');
        logInDiv.classList.add('unloaded');
        title.classList.add('unloaded');
        dashboard.classList.remove('unloaded');
        dashboardContent.classList.remove('unloaded');
        logInForm.reset();        
    }
    
}


signInBtn.addEventListener('click', () => {
    title.classList.add('unloaded');  
    logInDiv.classList.add('unloaded');    
    signInDiv.classList.remove('unloaded');
})

logInBtn.addEventListener('click', () => {
    signInDiv.classList.add('unloaded');   
    title.classList.add('unloaded');
    logInDiv.classList.remove('unloaded');
})

logToSign.addEventListener('click', () => {
    logInDiv.classList.add('unloaded');
    signInDiv.classList.remove('unloaded');
})

signToLog.addEventListener('click', () => {
    signInDiv.classList.add('unloaded');
    logInDiv.classList.remove('unloaded');
})

signInForm.addEventListener('submit', signIn);

logInForm.addEventListener('submit', logIn);

const displayLists = () => {
    const lists = document.createElement('UL');
    lists.id = 'lists';
    dashboardContent.append(lists);
    for(i=0; i<currentUser.lists.length; i++) {
        const list = document.createElement('LI');
        const listLink = document.createElement('A');
        const removeList = document.createElement('BUTTON');
        list.id = 'list' + i;        
        listLink.setAttribute('href', '/');
        listLink.classList.add('list-link');
        listLink.innerText = currentUser.lists[i].name;
        removeList.innerText = 'remove list';
        removeList.id = 'remove-list' + i;
        removeList.classList.add('remove-btn');
        removeList.addEventListener('click', () => {
            const nr = removeList.id.substring(11);
            document.getElementById(`list${nr}`).remove();
            currentUser.lists.splice(nr, 1);
            local.setItem('users', JSON.stringify(users))
            for(i=0; i<lists.children.length; i++) {
                lists.children[i].id = 'list' + i;
                lists.children[i].children[1].id = 'remove-list' + i;
            }
        })
        list.appendChild(listLink);
        list.appendChild(removeList);
        lists.appendChild(list);
    }

    for(prop of listLinks) {
        prop.addEventListener('click', displayList)
    }

}

const displayList = (e) => {
    e.preventDefault();
    let path = e.composedPath();
    for(i=0; i<currentUser.lists.length; i++) {
        path[0].innerText === currentUser.lists[i].name ? currentList = currentUser.lists[i] : currentList
    }    
    for (i=0; i<currentList.items.length; i++) {
        let obj = Object.assign({}, currentList.items[i]);        
        editedItems.push(obj);        
    } 
    listTitle.innerText = currentList.name;
    local.setItem('currentList', currentList.name)
    const itemsList = document.createElement('OL');
    itemsList.id = 'items-list';
    for(i=0; i<currentList.items.length; i++) {
        const items = currentList.items       
        const item = document.createElement('LI');
        item.innerText = items[i].item;
        if(items[i].done) {
            item.classList.add('green')
        }
        item.id = 'item' + i;
        const label = document.createElement('LABEL');
        label.innerText = 'Done!';
        const isDone = document.createElement('INPUT');
        isDone.setAttribute('type', 'checkbox');
        isDone.checked = items[i].done;
        isDone.id = i;
        isDone.addEventListener('change', (e) => {
            editedItems[isDone.id].done = !editedItems[isDone.id].done
            if (isDone.checked) {
                item.classList.add('green')
            } else {
                item.classList.remove('green')
            }
          
        })
        const removeItem = document.createElement('BUTTON');
        removeItem.innerText = 'remove item';
        removeItem.id = 'remove-item' + i;
        removeItem.classList.add('remove-btn');
        removeItem.addEventListener('click', () => {
           const nr = removeItem.id.substring(11);
           document.getElementById(`item${nr}`).remove();
           editedItems.splice(nr, 1);
           for (i=0; i<itemsList.children.length; i++) {
            itemsList.children[i].id = 'item' + i;            
            itemsList.children[i].children[1].id = 'remove-item' + i;
            itemsList.children[i].children[0].children[0].id = i;
           }

        })
        label.appendChild(isDone);
        item.appendChild(label);
        item.appendChild(removeItem);
        itemsList.appendChild(item);
    }
    document.getElementById('new-list-name').value = currentList.name;
    listDiv.appendChild(itemsList);
    changeUserInfo.classList.add('unloaded');
    fillInChange.classList.add('unloaded');
    passNotMatch.classList.add('unloaded');
    dashboardContent.classList.add('unloaded');
    document.getElementById('lists').remove();
    listInside.classList.remove('unloaded');    
}

newList.addEventListener('submit', (e) => {
    const listName = document.getElementById('list-name').value;
    const checkName = (name) => {
        for(prop of currentUser.lists) {
            if (prop.name === name) {
                return true
            }
        }
        return false
    }
    e.preventDefault();
    nameAlreadyUsed.classList.add('unloaded');
    if (!listName) {
        return
    } else if (checkName(listName)){
        nameAlreadyUsed.classList.remove('unloaded');
    } else {
        let newListObj = {
            name: listName,
            items: [],
        }    
        local.setItem('currentList', listName);
        currentUser.lists.push(newListObj);
        currentList = currentUser.lists[currentUser.lists.length - 1];
        local.setItem('users', JSON.stringify(users))    
        const itemsList = document.createElement('OL');
        itemsList.id = 'items-list';
        document.getElementById('list-title').innerText = listName;
        document.getElementById('new-list-name').value = currentList.name;
        listDiv.appendChild(itemsList);
        dashboardContent.classList.add('unloaded');
        document.getElementById('lists').remove();
        listInside.classList.remove('unloaded');
        changeUserInfo.classList.add('unloaded');
        fillInChange.classList.add('unloaded');
        passNotMatch.classList.add('unloaded');
    }    
})

listNameForm.addEventListener('submit', (e) => {
    const newName = document.getElementById('new-list-name').value;
    const checkName = (name) => {
        for(prop of currentUser.lists) {
            if (prop.name === name) {
                return true
            }
        }
        return false
    }
    e.preventDefault();
    if (newName === currentList.name || !newName) {
        return
    } else if (checkName(newName)) {
        nameInUse.classList.remove('unloaded');
    } else {
        currentList.name = newName;
        nameInUse.classList.add('unloaded');
        listTitle.innerText = newName;
    }
    
})

addListItem.addEventListener('submit', (e) => {
    const itemName = document.getElementById('item-name');
    const itemsList = document.getElementById('items-list');
    e.preventDefault();
    if (!itemName.value) {
        return
    } else {
    newItem = document.createElement('LI');
    newItem.innerText = itemName.value;
    editedItems.push({item: itemName.value, done: false});
    const itemNumber = itemsList.children.length;
    newItem.id = 'item' + itemNumber;
    const label = document.createElement('LABEL');
    label.innerText = 'Done!';
    const isDone = document.createElement('INPUT');
    isDone.setAttribute('type', 'checkbox');
    isDone.id = itemNumber;
    const removeItem = document.createElement('BUTTON');
    removeItem.innerText = 'remove item';
    removeItem.id = 'remove-item' + itemNumber;
    removeItem.classList.add('remove-btn');

    isDone.addEventListener('change', (e) => {
        
        editedItems[isDone.id].done = !editedItems[isDone.id].done
        if (isDone.checked) {
            document.getElementById('item' + isDone.id).classList.add('green')
        } else {
            document.getElementById('item' + isDone.id).classList.remove('green')
        }    
    })

    removeItem.addEventListener('click', () => {
            const nr = removeItem.id.substring(11);
            document.getElementById(`item${nr}`).remove();
            editedItems.splice(nr, 1);
            for (i=0; i<itemsList.children.length; i++) {
            itemsList.children[i].id = 'item' + i;            
            itemsList.children[i].children[1].id = 'remove-item' + i;
            itemsList.children[i].children[0].children[0].id = i;
           }
    })
    label.appendChild(isDone);
    newItem.appendChild(label);
    newItem.appendChild(removeItem);
    itemsList.appendChild(newItem); 
    addListItem.reset();
    }
})

saveAndBack.addEventListener('click', () => {
    currentList.items = currentList.items.slice(0, editedItems.length);
    for (i=0; i<editedItems.length; i++) {
        if(currentList.items[i]) {
            currentList.items[i] = Object.assign(currentList.items[i], editedItems[i])
        } else {
            currentList.items.push(Object.assign({}, editedItems[i]))
        }
    }   
        local.setItem('users', JSON.stringify(users));
        local.removeItem('currentList');
        document.getElementById('items-list').remove();
        listInside.classList.add('unloaded');
        displayLists();
        dashboardContent.classList.remove('unloaded');
        editedItems = [];
        listTitle.innerText = '';        
})

save.addEventListener('click', () => { 
    currentList.items = currentList.items.slice(0, editedItems.length);
    for (i=0; i<editedItems.length; i++) {
        if(currentList.items[i]) {
            currentList.items[i] = Object.assign(currentList.items[i], editedItems[i])
        } else {
            currentList.items.push(Object.assign({}, editedItems[i]))
        }
    }
    local.setItem('users', JSON.stringify(users))
})

backToDashboard.addEventListener('click', () => {
        local.removeItem('currentList');
        document.getElementById('items-list').remove();
        listInside.classList.add('unloaded');
        displayLists();
        dashboardContent.classList.remove('unloaded');
        editedItems = [];
        listTitle.innerText = '';   
})

changeUserInfoLink.addEventListener('click', (e) => {
    e.preventDefault();
    changeUserInfo.classList.remove('unloaded');
    changeUserName.value = currentUser.userName;
    changePass.value = currentUser.pass;
    confirmPassChange.value = currentUser.pass;
})

cancelUserChanges.addEventListener('click', (e) => {
    e.preventDefault();
    changeUserInfo.classList.add('unloaded');
    fillInChange.classList.add('unloaded');
    passNotMatch.classList.add('unloaded');
})

submitUserChanges.addEventListener('submit', (e) => {    
    e.preventDefault();
    fillInChange.classList.add('unloaded');
    passNotMatch.classList.add('unloaded');
    if (!changeUserName.value) {
        fillInChange.classList.remove('unloaded')
    } else if (changePass.value !== confirmPassChange.value) {
        passNotMatch.classList.remove('unloaded')
    } else {
        currentUser.userName = changeUserName.value;
        currentUser.pass = changePass.value;
        local.setItem('users', JSON.stringify(users))
        document.getElementById('welcome').innerText = `Hello ${currentUser.userName}! Use the dashboard below to create and manage your to-do lists.`
        changeUserInfo.classList.add('unloaded');
    }
    
})

logOut.addEventListener('click', (e) => {
    e.preventDefault();
    const welcome = document.getElementById('welcome');
    welcome.remove();
    local.removeItem('currentList');
    local.removeItem('currentUser');
    const itemsList = document.getElementById('items-list');
    const lists = document.getElementById('lists');
    if (lists) {
        lists.remove();
    }    
    if (itemsList) {
        itemsList.remove();
    }
    listInside.classList.add('unloaded');
    title.classList.remove('unloaded');
    signOrLog.classList.remove('unloaded');
    dashboard.classList.add('unloaded');    
})


window.onload = () => {
    if (local.users) {
        users = JSON.parse(local.users)
    }
    if (local.currentList) {
        currentUser = findUser(local.currentUser);
        for(i=0; i<currentUser.lists.length; i++) {
            local.currentList === currentUser.lists[i].name ? currentList = currentUser.lists[i] : currentList
        }
        for (i=0; i<currentList.items.length; i++) {
            let obj = Object.assign({}, currentList.items[i]);        
            editedItems.push(obj);        
        } 
        listTitle.innerText = currentList.name;
    const itemsList = document.createElement('OL');
    itemsList.id = 'items-list';
    for(i=0; i<currentList.items.length; i++) {
        const items = currentList.items       
        const item = document.createElement('LI');
        item.innerText = items[i].item;
        if(items[i].done) {
            item.classList.add('green')
        }
        item.id = 'item' + i;
        const label = document.createElement('LABEL');
        label.innerText = 'Done!';
        const isDone = document.createElement('INPUT');
        isDone.setAttribute('type', 'checkbox');
        isDone.checked = items[i].done;
        isDone.id = i;
        isDone.addEventListener('change', (e) => {
            editedItems[isDone.id].done = !editedItems[isDone.id].done
            if (isDone.checked) {
                item.classList.add('green')
            } else {
                item.classList.remove('green')
            }
          
        })
        const removeItem = document.createElement('BUTTON');
        removeItem.innerText = 'remove item';
        removeItem.id = 'remove-item' + i;
        removeItem.classList.add('remove-btn');
        removeItem.addEventListener('click', () => {
           const nr = removeItem.id.substring(11);
           document.getElementById(`item${nr}`).remove();
           editedItems.splice(nr, 1);
           for (i=0; i<itemsList.children.length; i++) {
            itemsList.children[i].id = 'item' + i;            
            itemsList.children[i].children[1].id = 'remove-item' + i;
            itemsList.children[i].children[0].children[0].id = i;
           }

        })
        label.appendChild(isDone);
        item.appendChild(label);
        item.appendChild(removeItem);
        itemsList.appendChild(item);
    }
    document.getElementById('new-list-name').value = currentList.name;
    listDiv.appendChild(itemsList);
    const welcome = document.createElement('P');
    welcome.id = 'welcome';
    welcome.innerText = `Hello again ${currentUser.userName}! Your to-do lists are available below.`;        
    dashboard.insertBefore(welcome, dashboardContent);
    signOrLog.classList.add('unloaded');
    logInDiv.classList.add('unloaded');
    title.classList.add('unloaded');
    dashboard.classList.remove('unloaded');
    dashboardContent.classList.add('unloaded');
    listInside.classList.remove('unloaded');
    } else if (local.currentUser) {
        currentUser = findUser(local.currentUser);
        const welcome = document.createElement('P');
        welcome.id = 'welcome';
        welcome.innerText = `Hello again ${currentUser.userName}! Your to-do lists are available below.`;        
        dashboard.insertBefore(welcome, dashboardContent);
        displayLists();
        signOrLog.classList.add('unloaded');
        logInDiv.classList.add('unloaded');
        title.classList.add('unloaded');
        dashboard.classList.remove('unloaded');
        dashboardContent.classList.remove('unloaded');
    }
}
