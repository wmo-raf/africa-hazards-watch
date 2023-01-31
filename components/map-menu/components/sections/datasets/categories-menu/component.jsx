import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { Row, Column, Button } from "@erick-otenyo/hw-components";

import Icon from "components/ui/icon";

import styles from "./categories-menu.module.scss";

class CategoriesMenu extends PureComponent {
  render() {
    const { categories, onSelectCategory } = this.props;

    return (
      <div className={styles["c-categories-menu"]}>
        <Row>
          <Column>
            <h2 className={styles["categories-title"]}>DATASETS</h2>
          </Column>
          {categories.map((c) => (
            <Column key={c.category} width={[1 / 4]}>
              <div className={styles["category-item"]}>
                <Button
                  className={styles["category-btn"]}
                  round
                  size="large"
                  onClick={() =>
                    onSelectCategory({ datasetCategory: c.category })
                  }
                >
                  {!!c.layerCount && (
                    <span className={styles["category-btn-count"]}>{c.layerCount}</span>
                  )}
                  <Icon icon={c.icon} />
                </Button>
                <span className={styles["category-item-label"]}>{c.label}</span>
              </div>
            </Column>
          ))}
        </Row>
      </div>
    );
  }
}

CategoriesMenu.propTypes = {
  categories: PropTypes.array,
  onSelectCategory: PropTypes.func,
};

export default CategoriesMenu;
