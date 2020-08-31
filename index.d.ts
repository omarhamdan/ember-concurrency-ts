import {
  Task,
  TaskFunction as GenericTaskFunction,
  TaskFunctionArgs as Args,
  TaskFunctionReturnType as Return,
  TaskInstanceForTaskFunction as InstanceFor,
  EncapsulatedTaskDescriptor as GenericDescriptor,
  EncapsulatedTaskDescriptorArgs as DescriptorArgs,
  TaskInstanceForEncapsulatedTaskDescriptor as InstanceForDescriptor,
  EncapsulatedTaskDescriptorReturnType as DescriptorReturn,
  EncapsulatedTaskState,
  EncapsulatedTask
} from 'ember-concurrency';

type TaskFunction = GenericTaskFunction<any, any[]>;
type Descriptor = GenericDescriptor<any, any[]>;

interface TaskFor<T extends TaskFunction> extends Task<Return<T>, Args<T>> {
  linked(): Descriptor,
  unlinked(): Descriptor
}

interface TaskForDescriptor<T extends Descriptor> extends EncapsulatedTask<
  DescriptorReturn<T>,
  DescriptorArgs<T>,
  EncapsulatedTaskState<T>
> {
  linked(): Descriptor,
  unlinked(): Descriptor
}

/**
 * No-op typecast function that turns what TypeScript believes to be a
 * generator function into a Task.
 *
 * ```js
 * import { taskFor } from 'ember-concurrency-ts';
 *
 * class Foo extends EmberObject {
 *   @task *myTask() {
 *     // ...
 *   }
 *
 *   someMethod() {
 *     this.myTask.perform(); // TypeError
 *     taskFor(this.myTask).perform(); // ok!
 *   }
 * }
 * ```
 *
 * @param task The task. Note that this is purely a typecast function,
 *   it does not in affect accept a task generator function as input.
 */
export function taskFor<T extends TaskFunction>(task: T): TaskFor<T>;
export function taskFor<T extends Descriptor>(task: T): TaskForDescriptor<T>;

/**
 * Typecast function that calls `perform` on a Task which TypeScript
 * believes to be a generator function.
 *
 * ```js
 * import { perform } from 'ember-concurrency-ts';
 *
 * class Foo extends EmberObject {
 *   someMethod() {
 *     this.myTask.perform(); // TypeError
 *     perform(this.myTask); // ok!
 *   }
 * }
 * ```
 *
 * @param task The task. Note that this is purely a typecast function,
 *   it does not in affect accept a task generator function as input.
 * @param args Any arguments to pass to the `perform()` call.
 */
export function perform<T extends TaskFunction>(task: T, ...args: Args<T>): InstanceFor<T>;
export function perform<T extends Descriptor>(task: T, ...args: DescriptorArgs<T>): InstanceForDescriptor<T>;
