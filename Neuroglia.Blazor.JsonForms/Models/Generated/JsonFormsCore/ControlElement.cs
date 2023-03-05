namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// A control element. The scope property of the control determines
    /// to which part of the schema the control should be bound.
    /// </summary>
    public interface ControlElement : UISchemaElement, Scoped, Labelable<Neuroglia.Blazor.JsonForms.Models.GeneratedTypes.LabelDescriptionStringBoolUnion>, Internationalizable
    {
    }
}

