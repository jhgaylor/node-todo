var fs = require('fs');
var todorc_path = `${process.env.HOME}/.todorc.json`;

function load () {
    var todos = [];
    try {
        todos = require(todorc_path, {bustCache: true});
    } catch (e) {
        console.warn(`Could not load ${todorc_path}`);
    }

    return todos;
}

function save (todos) {
    var ret = fs.writeFileSync(todorc_path, JSON.stringify(todos));
    console.log("Finished writing Todos");
    return;
}

function showTodos (todos) {
    console.log("[[ TODOS ]]")
    // allow specifying an array of todos or loading from disk
    todos = todos || load();
    todos.forEach(function (todo, index) {
        console.log(`${index} - ${todo}`);
    });
}

function removeIndexes (indexes) {
    var todos = load();
    indexes.forEach(function (index) {
        todos[index] = null;
    });
    var todos = todos.filter(function (todo) {
        return !!todo;
    });

    save(todos);
    showTodos(todos);
}

function addTodo (todo) {;
    var todos = load();
    todos.push(todo);
    save(todos);
    showTodos();
}

if (process.argv.length === 2) {
    showTodos();
} else if (process.argv[2] === "-r" || process.argv[2] === '--remove' || process.argv[2] === '--rm') {
    removeIndexes(process.argv.slice(3));
} else if (process.argv.length > 2) {
    addTodo(process.argv.slice(2).join(" "));
}
