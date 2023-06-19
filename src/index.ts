import 'reflect-metadata';
import 'module-alias/register';
import LibraryServerManager from './LibraryServerManager';
import { container } from 'tsyringe';

const libraryServerManager = container.resolve(LibraryServerManager);

libraryServerManager.start();
