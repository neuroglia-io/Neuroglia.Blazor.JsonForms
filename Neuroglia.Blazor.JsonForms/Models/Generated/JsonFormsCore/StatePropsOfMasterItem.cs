namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface StatePropsOfMasterItem : OwnPropsOfMasterListItem
    {
        [System.Text.Json.Serialization.JsonPropertyName("childLabel")]
        string ChildLabel { get; set; }

    }
}

