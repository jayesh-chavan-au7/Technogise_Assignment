import { getInputEvents, triggerPrompt } from '@utils/';
import { UserInputEventsEnum } from '@enums/';
import LibraryManager from './LibraryManager';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
class LibraryServerManager {
  constructor(private libraryManager: LibraryManager) {
    this.libraryManager = libraryManager;
  }

  public async start() {
    console.log('====================================');
    console.log('WELCOME TO BOOK LIBRARY');
    console.log('====================================');
    let keepServerUp = true;

    while (keepServerUp) {
      const { booksCollection, totalBooks } =
        this.libraryManager.bookPaginationState;

      try {
        const inputEvents = getInputEvents(booksCollection, totalBooks);
        const action = await triggerPrompt('How May I help you', inputEvents);
        switch (action) {
          case UserInputEventsEnum.fetchBooks:
            await this.libraryManager.fetchBookAction();
            break;
          case UserInputEventsEnum.fetchMoreBooks:
            await this.libraryManager.fetchBookAction();
            break;
          case UserInputEventsEnum.borrowBook:
            await this.libraryManager.borrowBookAction();
            break;
          case UserInputEventsEnum.exist:
            keepServerUp = false;
            break;
          default:
            break;
        }
      } catch (error: any) {
        if (error.message) {
          console.log(error.message);
          continue;
        }
        console.log('Opps something went wrong !!!');
        continue;
      }
    }
  }
}

export default LibraryServerManager;
