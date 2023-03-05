using Microsoft.AspNetCore.Components;
using Neuroglia.Blazor.JsonForms.Models.JsonFormsCore;

namespace Neuroglia.Blazor.JsonForms;

/// <summary>
/// Represents the properties (web component's attributes) that can be set
/// </summary>
public class JsonFormInputs
{
    /// <summary>
    /// The UI schema used to build the form
    /// </summary>
    public object? UISchema { get; set; }
    /// <summary>
    /// The JSON schema used to build the form
    /// </summary>
    public object? Schema { get; set; }
    /// <summary>
    /// The default data used to build the form
    /// </summary>
    public object? Data { get; set; }
    /// <summary>
    /// The AJV options
    /// </summary>
    public object? Options { get; set; }
    /// <summary>
    /// Defines if the form is read only
    /// </summary>
    public bool ReadOnly { get; set; } = false;
    /* map other params when PoC is done */
}