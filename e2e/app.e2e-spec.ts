import { Angular4OidcclientjsExamplePage } from './app.po';

describe('angular4-oidcclientjs-example App', () => {
  let page: Angular4OidcclientjsExamplePage;

  beforeEach(() => {
    page = new Angular4OidcclientjsExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
