class Sidebar {

    // Sidebar Titles
    static pool_nodes_title;
    static logic_title;
    static process_nodes_title;
    static reference_nodes_title;
    
    constructor (sketch, grid) {
        this.sketch = sketch;
        this.grid = grid;
        this.entityPoolNodes = [];
        this.logicOperators = [];
        this.processNodes = [];
        this.referenceNode = [];

        //Entity Pool Nodes
        Sidebar.pool_nodes_title = sketch.createElement('h4', 'Entity Pool Nodes:')
        Sidebar.pool_nodes_title.position(20, 20);
        this.entityPoolNodes.push(new SB_Component(empty, 'Empty Set'               , 20, 60, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(macro, 'Macro Molecule'          , 100, 60, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(nuc_acid, 'Nucleic Acid Feature' , 180, 60, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(pert_agent, 'Peturbing Agent'    , 20, 130, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(simple_chem, 'Simple Chemical'   , 100, 130, sketch, grid));
        this.entityPoolNodes.push(new SB_Component(unspec_ent, 'Unspecified Entity' , 180, 130, sketch, grid));

        //Logic Operators
        Sidebar.logic_title = sketch.createElement('h4', 'Logic Operators:')
        Sidebar.logic_title.position(20, 200);
        this.logicOperators.push(new SB_Component(and, 'AND Operator', 20, 240, sketch, grid));
        this.logicOperators.push(new SB_Component(not, 'NOT Operator', 100, 240, sketch, grid));
        this.logicOperators.push(new SB_Component(or, 'OR Operator'  , 180, 240, sketch, grid));

        // Process Nodes
        Sidebar.process_nodes_title = sketch.createElement('h4', 'Process Nodes:')
        Sidebar.process_nodes_title.position(20, 310);
        this.processNodes.push(new SB_Component(assoc, 'Association'            , 20, 350, sketch, grid));
        this.processNodes.push(new SB_Component(dissoc, 'Dissociation'          , 100, 350, sketch, grid));
        this.processNodes.push(new SB_Component(omit_process, 'Omitted Process' , 180, 350, sketch, grid));
        this.processNodes.push(new SB_Component(pheno, 'Phenotype'              , 20, 420, sketch, grid));
        this.processNodes.push(new SB_Component(process, 'Process'              , 100, 420, sketch, grid));
        this.processNodes.push(new SB_Component(uncert_pro, 'Uncertain Process' , 180, 420, sketch, grid));

        // Reference Nodes
        Sidebar.reference_nodes_title = sketch.createElement('h4', 'Reference Nodes:')
        Sidebar.reference_nodes_title.position(20, 490);
        this.referenceNode.push(new SB_Component(tag, 'Tag', 20, 530, sketch, grid));
    }
}