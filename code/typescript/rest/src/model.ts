class TodoModel {
  private gid: number = 0;
  public add = () => this.gid++;
  public remove = (id: number) => void 0
}
declare var todoModel: TodoModel;
todoModel = new TodoModel; 