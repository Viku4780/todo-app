 export function completedTodo(arr,fun) {
    let count = 0;
    arr.forEach(item => {
      if (item.completed) count++;
    });

    fun(count);
  }
