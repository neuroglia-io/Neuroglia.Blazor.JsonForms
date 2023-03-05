namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface StatePropsOfArrayLayout : StatePropsOfControlWithDetail
    {
        [System.Text.Json.Serialization.JsonPropertyName("minItems")]
        double? MinItems { get; set; }

    }
}

