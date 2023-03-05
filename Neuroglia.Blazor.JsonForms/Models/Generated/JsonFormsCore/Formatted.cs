namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{
    using Neuroglia.Blazor.JsonForms.Models.JsonFormsCore.Actions;
    using Neuroglia.Blazor.JsonForms.Models.JsonFormsCore.Test;

    /// <summary>
    /// public interface for mapping a given type to a formatted string and back.
    /// </summary>
    public interface Formatted<A>
    {
        /// <summary>
        /// Retrieve a value from a given string.
        /// </summary>
        /// <returns>
        /// the obtained value
        /// 
        /// </returns>
        A FromFormatted(string formatted);

        /// <summary>
        /// Format the given value
        /// </summary>
        /// <returns>
        /// the formatted string
        /// 
        /// </returns>
        string ToFormatted(A value);

    }
}

