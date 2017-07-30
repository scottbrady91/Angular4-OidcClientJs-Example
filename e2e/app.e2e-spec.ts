import { Angular4OidcclientjsExamplePage } from './app.po';

describe('angular4-oidcclientjs-example App', () => {
  let page: Angular4OidcclientjsExamplePage;

  beforeEach(() => {
    page = new Angular4OidcclientjsExamplePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
