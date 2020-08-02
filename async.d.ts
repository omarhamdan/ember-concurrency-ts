import 'ember-concurrency-async';
import {
  Task,
  TaskForAsyncEncapsulatedTaskDescriptor as AsyncTaskForDescriptor,
  TaskInstanceForAsyncTaskFunction as AsyncInstanceFor,
  TaskInstanceForAsyncEncapsulatedTaskDescriptor as AsyncInstanceForDescriptor,
  AsyncTaskFunction as GenericAsyncTaskFunction,
  AsyncTaskFunctionArgs as Args,
  AsyncTaskFunctionReturnType as Return,
  AsyncEncapsulatedTaskDescriptor as GenericAsyncDescriptor,
  AsyncEncapsulatedTaskDescriptorArgs as DescriptorArgs
} from 'ember-concurrency';
import { taskFor, perform, Descriptor } from 'ember-concurrency-ts';

type AsyncDescriptor = GenericAsyncDescriptor<any, any[]>;
type AsyncTaskFunction = GenericAsyncTaskFunction<any, any[]>;

interface AsyncTaskFor<T extends AsyncTaskFunction> extends Task<Return<T>, Args<T>> {
  linked(): AsyncDescriptor,
  unlinked(): AsyncDescriptor
}

declare module 'ember-concurrency-ts' {
  function taskFor<T extends AsyncTaskFunction>(task: T): AsyncTaskFor<T>;
  function taskFor<T extends AsyncDescriptor>(task: T): AsyncTaskForDescriptor<T>;

  function perform<T extends AsyncTaskFunction>(task: T, ...args: Args<T>): AsyncInstanceFor<T>;
  function perform<T extends AsyncDescriptor>(task: T, ...args: DescriptorArgs<T>): AsyncInstanceForDescriptor<T>;
}
