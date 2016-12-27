import { TestNg2Page } from './app.po';

describe('test-ng2 App', function() {
  let page: TestNg2Page;

  beforeEach(() => {
    page = new TestNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
