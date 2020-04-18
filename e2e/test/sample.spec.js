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
      await page.type('.task-input', newTaskContent, { delay: 50 });
      await page.click('.add-btn');

      let newTask = await page.waitFor('.task-item .task-item:nth-child(' + (originalItemsCount) + ')');
      const expectInputContent = await page.evaluate(newTask => newTask.querySelector('label').textContent, newTask);
      expect(expectInputContent).to.eql(newTaskContent);
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


  //修改任务
  describe('edit task', function () {
    it('should update task', async function () {
      const updatedContent = 'this is a String';
      const textareaElement = await page.$('.task-item:last-child label');
      await page.click('.task-items .task-item:last-child .update-btn');
      await page.click('.task-items .task-item:last-child .write-input .write-input-name');
      await textareaElement.type(updatedContent);
      await page.click('.task-items .task-item:last-child .write-input .write-input-hide .write-input-hide-yes');
      // await page.$eval('.task-item:last-child label', textarea => textarea.blur());

      let theLastItem = await page.waitFor('.task-items .task-item:last-child');
      const expectInputContent = await page.evaluate(task => task.querySelector('label').textContent, theLastItem);
      expect(expectInputContent).to.eql(updatedContent);
    });
  });




});
