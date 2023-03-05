namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{
    using Neuroglia.Blazor.JsonForms.Models.JsonFormsCore.Actions;
    using Neuroglia.Blazor.JsonForms.Models.JsonFormsCore.Test;

    /// <summary>
    /// An Action type which accepts any other properties.
    /// This is mainly for the use of the `Reducer` type.
    /// This is not part of `Action` itself to prevent types that extend `Action` from
    /// having an index signature.
    /// </summary>
    public interface AnyAction : Action
    {
        /// <summary>
        /// An Action type which accepts any other properties.
        /// This is mainly for the use of the `Reducer` type.
        /// This is not part of `Action` itself to prevent types that extend `Action` from
        /// having an index signature.
        /// </summary>
        public object this[string] { get => throw new System.NotImplementedException(); set => throw new System.NotImplementedException(); }
    }
}

