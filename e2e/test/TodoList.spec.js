describe('todo test', function () {
  let page;
  let newTaskContent;

  before(async function () {
    page = await browser.newPage();
    let random = new Date().getMilliseconds();
    newTaskContent = 'new todo item ' + random;
    await page.goto('http://127.0.0.1:3000/');
  });

  after(async function () {
    await page.close();
  });
  //测试标题正确性
  it('should have correct title', async function () {
    expect(await page.title()).to.eql('TodoList');
  })

  //添加任务
  describe('add task', function () {
    it('should create new task', async function () {
      await page.waitFor('.task-input');
      let originalItemsCount = await page.$$('.task-item').then(item => item.length);

      await page.click('.task-input');
      await page.type('.task-input', newTaskContent);
      await page.click('.submit-button');
      let newTask = await page.waitFor('.task-items .task-item:nth-child(' + (originalItemsCount + 1) + ')');
      const expectInputContent = await page.evaluate(newTask => newTask.querySelector('input').value, newTask);
      expect(expectInputContent).to.eql(newTaskContent);
    });
  });

  //修改任务
  describe('edit task', function () {
    it('should update task', async function () {
      const updatedContent = 'updated content';
      await page.waitFor('.task-input');
      await page.click('.task-items .task-item:last-child .update-btn');
      const textareaElement = await page.$('.task-item:last-child input');
      await textareaElement.click({ clickCount: 3 })
      await textareaElement.type(updatedContent);
      await page.$eval('.task-item:last-child input', input => input.blur());

      let theLastItem = await page.waitFor('.task-items .task-item:last-child');
      const expectInputContent = await page.evaluate(task => task.querySelector('input').value, theLastItem);
      expect(expectInputContent).to.eql(updatedContent);
    });
  });

  //删除任务
  describe('delete task', function () {
    it('should delete task', async function () {
      await page.waitFor('.task-input');
      let originalItemsCount = await page.$$('.task-item').then(item => item.length);

      await page.click('.task-items .task-item:last-child .delete-btn');
      await page.waitFor(500);

      let itemsCount = await page.$$('.task-item').then(item => item.length);
      expect(originalItemsCount - itemsCount).to.eql(1);
    });
  });


});
