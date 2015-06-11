import React from 'react';

import Compile from '../Compile';
import FieldViewConfiguration from '../../Field/FieldViewConfiguration';

class Column extends React.Component {
    getDetailAction (entry) {
        return function() {
            let entityName = this.props.entityName,
                entity = this.props.configuration.getEntity(entityName),
                route = entity.editionView().enabled ? 'edit' : 'show';

            this.context.router.transitionTo(route, {entity: entityName, id: entry.identifierValue});
        }.bind(this);
    }

    isDetailLink(field) {
        if (field.isDetailLink() === false) {
            return false;
        }
        if (field.type() !== 'reference' && field.type() !== 'reference_many') {
            return true;
        }
        var referenceEntity = field.targetEntity().name();
        var relatedEntity = this.props.configuration.getEntity(referenceEntity);
        if (!relatedEntity) return false;

        return relatedEntity.isReadOnly ? relatedEntity.showView().enabled : relatedEntity.editionView().enabled;
    }

    render() {
        let {field, entry, entity} = this.props;

        let isDetailLink = this.isDetailLink(field);
        let detailAction = isDetailLink ? this.getDetailAction(this.props.entry) : null;
        let type = field.type();
        let fieldView = FieldViewConfiguration.getFieldView(type);
        let column = null;

        if (fieldView) {
            column = isDetailLink ? fieldView.getLinkWidget() : fieldView.getReadWidget();
        }

        //return <Compile detailAction={detailAction} field={field} entity={entity} entry={entry}>{column}</Compile>;
        return <span>{column}</span>;
    }
}

Column.propTypes = {
    field: React.PropTypes.object.isRequired,
    entry: React.PropTypes.object.isRequired,
    entity: React.PropTypes.object.isRequired
};

export default Column;
