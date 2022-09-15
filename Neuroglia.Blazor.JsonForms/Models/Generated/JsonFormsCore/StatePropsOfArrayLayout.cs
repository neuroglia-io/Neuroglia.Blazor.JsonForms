namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface StatePropsOfArrayLayout : StatePropsOfControlWithDetail
    {
        [System.Text.Json.Serialization.JsonPropertyName("minItems")]
        double? MinItems { get; set; }

    }
}

