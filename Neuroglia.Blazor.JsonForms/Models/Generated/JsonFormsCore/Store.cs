namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{
    using Neuroglia.Blazor.JsonForms.Models.JsonFormsCore.Actions;
    using Neuroglia.Blazor.JsonForms.Models.JsonFormsCore.Test;

    /// <summary>
    /// A store is an object that holds the application's state tree.
    /// There should only be a single store in a Redux app, as the composition
    /// happens on the reducer level.
    /// </summary>
    public interface Store<S, A>
    {
        /// <summary>
        /// Dispatches an action. It is the only way to trigger a state change./// The `reducer` function, used to create the store, will be called with the
        /// current state tree and the given `action`. Its return value will be
        /// considered the **next** state of the tree, and the change listeners will
        /// be notified.
        /// 
        /// The base implementation only supports plain object actions. If you want
        /// to dispatch a Promise, an Observable, a thunk, or something else, you
        /// need to wrap your store creating function into the corresponding
        /// middleware. For example, see the documentation for the `redux-thunk`
        /// package. Even the middleware will eventually dispatch plain object
        /// actions using this method.
        /// 
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("dispatch")]
        Dispatch<A> Dispatch { get; set; }

        /// <summary>
        /// Interoperability point for observable/reactive libraries.
        /// </summary>
        /// <returns>
        /// A minimal observable of state changes.
        /// For more information, see the observable proposal:
        /// https://github.com/tc39/proposal-observable
        /// 
        /// </returns>
        Observable<S> [Symbol.Observable]();

        /// <summary>
        /// Reads the state tree managed by the store.
        /// </summary>
        /// <returns>
        /// The current state tree of your application.
        /// 
        /// </returns>
        S GetState();

        /// <summary>
        /// Replaces the reducer currently used by the store to calculate the state./// You might need this if your app implements code splitting and you want to
        /// load some of the reducers dynamically. You might also need this if you
        /// implement a hot reloading mechanism for Redux.
        /// 
        /// </summary>
        void ReplaceReducer(Reducer<S, A> nextReducer);

        /// <summary>
        /// Adds a change listener. It will be called any time an action is
        /// dispatched, and some part of the state tree may potentially have changed.
        /// You may then call `getState()` to read the current state tree inside the
        /// callback./// You may call `dispatch()` from a change listener, with the following
        /// caveats:
        /// 
        /// 1. The subscriptions are snapshotted just before every `dispatch()` call.
        /// If you subscribe or unsubscribe while the listeners are being invoked,
        /// this will not have any effect on the `dispatch()` that is currently in
        /// progress. However, the next `dispatch()` call, whether nested or not,
        /// will use a more recent snapshot of the subscription list.
        /// 
        /// 2. The listener should not expect to see all states changes, as the state
        /// might have been updated multiple times during a nested `dispatch()` before
        /// the listener is called. It is, however, guaranteed that all subscribers
        /// registered before the `dispatch()` started will be called with the latest
        /// state by the time it exits.
        /// 
        /// </summary>
        /// <returns>
        /// A function to remove this change listener.
        /// 
        /// </returns>
        Unsubscribe Subscribe(System.Action listener);

    }
}

