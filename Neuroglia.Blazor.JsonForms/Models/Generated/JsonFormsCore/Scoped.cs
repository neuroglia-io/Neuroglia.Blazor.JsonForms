namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// Interface for describing an UI schema element that is referencing
    /// a subschema. The value of the scope must be a JSON Pointer.
    /// </summary>
    interface Scoped : Scopable
    {
    }
}

